export const formatFlowDescription = (data:string) => {
    let processedData:string;
    switch(data){
        case "sale":
            processedData = "venda"
            return processedData;
        case "deposit":
            processedData = "deposito"
            return processedData;
        case "withdraw":
            processedData = "saque"
            return processedData;
        case "commission":
            processedData = "comissão"
            return processedData;
        case "tax":
            processedData = "imposto"
            return processedData;
        case "supplier":
            processedData = "fornecedor"
            return processedData;
        case "pots":
            processedData = "potes"
            return processedData;
        case "venda":
            processedData = "sale"
            return processedData;
        case "deposito":
            processedData = "deposit"
            return processedData;
        case "saque":
            processedData = "withdraw"
            return processedData;
        case "comissão":
            processedData = "commission"
            return processedData;
        case "imposto":
            processedData = "tax"
            return processedData;
        case "fornecedor":
            processedData = "supplier"
            return processedData;
        case "potes":
            processedData = "pots"
            return processedData;
    }
    return '';
}

export const formatFlowType = (data:string) => {
    let processedData:string;
    switch(data){
        case "revenue":
            processedData = "entrada"
            return processedData;
        case "expense":
            processedData = "saida"
            return processedData;
        case "entrada":
            processedData = "revenue"
            return processedData;
        case "saida":
            processedData = "expense"
            return processedData;
    }
    return '';
}