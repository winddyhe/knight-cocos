
export class Func
{
    public Method: Function;
    public Context: any;

    public constructor(rMethod: Function, rContext: any)
    {
        this.Method = rMethod;
        this.Context = rContext;
    }

    public Call(...anyArgs: any[]): any
    {
        if (this.Method == null)
        {
            console.error("Event handler method is null.");
            return;
        }
        return this.Method.call(this.Context, ...anyArgs);
    }
}
