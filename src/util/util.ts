export function mixin(...args: any[]){
    var t = args.shift();
    var i = 0, len = args.length;
    
    while(i < len){
        let s = args[i];
        for(let key in s){
            t[key] = s[key];
        }
        i++;
    }
    return t;
}