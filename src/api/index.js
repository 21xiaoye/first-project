import user from './user'
import shoppings from './shoppings'
//登录
export const login = (data) => user({
    url: '/api/login',
    data: data,
    method: 'post'
})
//注册
export const reguser = (data) => user({
    url: '/api/reguser',
    data: data,
    method: 'post'
})

//获取验证码
export const postCode = (data) => user({
    url: '/api/email',
    data,
    method: 'post'
})

//上传用户头像
export const avatars = (data) => user({
    url: "/user/avatar",
    data,
    method: 'post'
})

//获取用户信息接口
export const userinfo = () => user({
    url:'/my/userinfo',
    method: 'get',
})

//更换用户头像
export const userBg = (data) => user({
    url: "/user/user_bg",
    data,
    method: 'post'
})
//修改密码
export const updatePassword = (data) => user({
    url: '/user/updatepwd',
    data,
    method:'put'
})

//修改用户信息
export const updateUserInfo = (data) => user({
    url: '/user/updateuser',
    data,
    method:'put'
})

//上传用户精选照片
export const userFeaturedphotos = (data) => user({
    url: '/user/featuredphotos',
    data,
    method:'post'
})

//删除精选照片
export const deletephotos = (data) => user({
    url: '/user/deletephotos',
    data,
    method:'delete'
})

//获取商品分类
export const Classification = () => shoppings({
    url:'/api/shopping/list',
    method:'get'
})
//主页轮播图
export const BannerList = () => shoppings({
    url: '/api/shopping/banner',
    method:'get'
})

//商品子分类
export const classFList = (id) => shoppings({
    url: '/api/shopping/classFlist',
    params: {
        uid:id
    },
    method:'get'
})

//商品列表
export const productinfoList= (id) => shoppings({
    url: '/api/shopping/barnd/list',
    params: {
        uid:id
    },
    method:'get'
})

//商品信息
export const commodityDetails = (id) => shoppings({
    url: "/api/shopping/commodity",
    params: {
        id:id
    },
    method:'get'
})


//获取当前位置
// export const getLocation = () => user({
//     url: '',
//     method:'post'
// })

