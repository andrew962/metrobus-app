export interface BalanceResponce {
    Item: {
        Balance: string;
        CardID: string;
        LastTransactionAt: string;
        Status: string;
        Name?:string;
    }
    Success: number
}