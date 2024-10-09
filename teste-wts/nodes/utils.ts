import axios from 'axios';
import { IExecuteFunctions } from 'n8n-workflow';

const delay = 3000;
const defaultAutoPageSize = 100;

export function paramsDefault(parametersToRequest: any) {
    return {
        pageNumber: parametersToRequest.pageNumber,
        pageSize: parametersToRequest.pageSize,
        orderBy: parametersToRequest.orderBy,
        orderDirection: parametersToRequest.orderDirection,

        'CreatedAt.After': parametersToRequest.createdAtAfter,
        'CreatedAt.Before': parametersToRequest.createdAtBefore,
        'UpdatedAt.After': parametersToRequest.updatedAtAfter,
        'UpdatedAt.Before': parametersToRequest.updatedAtBefore,

        "ActiveAt.After": parametersToRequest.activeAtAfter,
        "ActiveAt.Before": parametersToRequest.activeAtBefore,
        "EndAt.After": parametersToRequest.endAtAfter,
        "EndAt.Before": parametersToRequest.endAtBefore,
        "LastInteractionAt.After": parametersToRequest.lastInteractionAtAfter,
        "LastInteractionAt.Before": parametersToRequest.lastInteractionAtBefore
    }
}

export async function sendRequestOrAutoPagination(params: any, url: string, token: string) {

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const sendRequest = async (params: any = null) => {
        return axios.get(url, {
            cancelToken: source.token,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            params
        });
    };

    params.pageSize = params.autoPagination ? defaultAutoPageSize : params.pageSize;
    const newVariable = {
        ...params,
        ...paramsDefault(params),
    }
    const req: any = { };

    Object.keys(newVariable).forEach(key => {
        if(newVariable[key] != null)
       req[key] = newVariable[key];
    });

    const response = await sendRequest(req);

    if (!params.autoPagination) 
        return response.data;

    const result: any = {
        items: response.data.items ?? [],
        hasMorePages: response.data.hasMorePages,
        pageNumber: response.data.pageNumber,
        totalPages: response.data.totalPages,
        totalItems: response.data.totalItems,
        pageSize: response.data.pageSize
    };

    let hasMore = response.data.hasMorePages;
    let count = 1;

    const pageSize = defaultAutoPageSize;
    let pageNumber = 2;

    while (hasMore && count < params.maxPage) {
        count += 1;

        try {
            const response = await sendRequest({
                ...req,
                pageSize: pageSize,
                pageNumber: pageNumber,
            });

            const data = response.data;

            if (result.items.length + data.items.length > 5000) {
                const itemsToAdd = data.items.slice(0, 5000 - result.items.length);
                result.items.push(...itemsToAdd);
                passRequestValues(result, data);
                hasMore = false;
                source.cancel('Exceeded number of items');
                break;
            }
            else {
                result.items.push(...data.items);
            }

            if (count == params.maxPage || count == 100 || !data.hasMorePages) {
                passRequestValues(result, data);
                break;
            }

            const seconds = count <= 10 ? delay : ((count % 10) +  1) * delay;
            await new Promise(resolve => setTimeout(resolve, seconds));

            pageNumber += 1;

        } catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }

    return result;

}

function passRequestValues(result: any, data: any) {
    result.totalItems = data.totalItems;
    result.totalPages = data.totalPages;
    result.pageSize = data.pageSize;
    result.pageNumber = data.pageNumber;
    result.hasMorePages = data.hasMorePages;
}

export function getParamsGenerics(node: IExecuteFunctions) {
    const autoPagination = node.getNodeParameter('autoPagination', 0) as boolean;
    const maxPage = autoPagination ? node.getNodeParameter('maxPage', 0) as number : null;
    const pageNumber = !autoPagination ? node.getNodeParameter('pageNumber', 0) as number : null;
    const pageSize = !autoPagination ? node.getNodeParameter('pageSize', 0) as number : null;
	const orderBy = node.getNodeParameter('orderBy', 0) as string;
    const orderDirection = node.getNodeParameter('orderDirection', 0) as string;

    const createdAtAfter = node.getNodeParameter('createdAtAfter', 0) as string;
    const createdAtBefore = node.getNodeParameter('createdAtBefore', 0) as string;
    const updatedAtAfter = node.getNodeParameter('updatedAtAfter', 0) as string;
    const updatedAtBefore = node.getNodeParameter('updatedAtBefore', 0) as string;

    const paramsGenerics = {
        autoPagination: autoPagination,
        ...(autoPagination && maxPage && { maxPage: maxPage }),
        ...(!autoPagination && pageNumber && { pageNumber: pageNumber }),
        ...(!autoPagination && pageSize && { pageSize: pageSize }),

        ...(createdAtAfter && {createdAtAfter: createdAtAfter}),
        ...(createdAtBefore && {createdAtBefore: createdAtBefore}),
        ...(updatedAtAfter && {updatedAtAfter: updatedAtAfter}),
        ...(updatedAtBefore && {updatedAtBefore: updatedAtBefore}),

        ...(orderBy && {orderBy: orderBy}),
        ...(orderDirection && {orderDirection: orderDirection})
    }

    return paramsGenerics;
}