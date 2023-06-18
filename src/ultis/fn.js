export const getArrSlider=(s,e,num)=>{
    let limit=s>e?num:e
    let out=[]
     for(let i=s;i<=limit;i++){
        out.push(i)
     }
     if(s>e){
        for(let i=0;i<=e;i++){
            out.push(i)
         }
     }
     return out
}