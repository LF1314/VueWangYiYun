//计算时间的函数

export function settime(unix){
   let data = new Date(unix)
   
   function dstr(str){
       return str>=10 ? str : `0${str}`
   }
   let year = dstr(data.getFullYear());
   let month = dstr(data.getMonth()+1);
   let da = dstr(data.getDate());

   return `${year}-${month}-${da}`
}