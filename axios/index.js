import axios from 'axios'

const baseUrl = '/api'
const instance = axios.create({
    baseUrl,
    timeout:10000
})

const xhr = { 
    get(url,data,methods ='get', config){
        return new Promise((resolve,reject)=>{
            instance[methods](url,{params:data},config).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}

export default xhr


















