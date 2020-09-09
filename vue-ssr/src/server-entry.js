import createApp from './main';

export default (context) => {
    return new Promise((resolve, reject) =>{
        const {app,router,store} = createApp();
        router.push(context.url)
        router.onReady(()=>{
            // 获取当前地址匹配到的路径
            let matchs = router.getMatchedComponents();
            if(matchs.length === 0){
                reject(404)
            }
            Promise.all(
                matchs.map(component => {
                    if(component.asyncData){
                        return component.asyncData(store)
                    }
                })
            ).then(()=>{
                context.state = store.state;
                resolve(app)
            })
        },reject);

    });
}
