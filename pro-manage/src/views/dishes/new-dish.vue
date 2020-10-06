<template>
    <div class="new-dish">
        <div class="name">
            <label for=""><i>*</i>菜品名称:</label>
            <input type="text" v-model="name">
        </div>
        <div class="type">
            <label for=""><i>*</i>菜品分类:</label>
            <select name="" id="" v-model="type">
                <option value="" disabled>菜品分类</option>
                <option v-for="item in typeList" :key="item._id" :value="item._id">{{item.typeName}}</option>
            </select>
        </div>
        <div class="intro">
            <label for="">菜品介绍:</label>
            <textarea v-model="intro" placeholder="请输入内容"></textarea>
        </div>
        <div class="price">
            <label for=""><i>*</i>菜品售价:</label>
            <input type="text" v-model="price"><span>元</span>
        </div>
        <div class="unit">
            <label for="">计量单位:</label>
            <input type="text" v-model="unit">
        </div>
        <div class="tag">
            <label for="">商品推荐:</label>
            <p><input type="checkbox" v-model="tag" value="新品">新品</p>
            <p><input type="checkbox" v-model="tag" value="推荐">推荐</p>
        </div>

        <div class="img">
            <label for="">上传图片:</label>
            <!-- <div>
                <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture"
                    :default-file-list="fileList"
                    class="upload-list-inline"
                >
                    <a-button>上传图片</a-button>
                </a-upload>
            </div> -->
            <input type="text" v-model="imgSrc">
        </div>
        <div class="over">
            <span @click="submitAction">完成，提交菜品</span>
        </div>

    </div>
</template>

<script>
import { Upload, Button, Icon } from 'ant-design-vue';
import {mapState} from 'vuex';
import http from '../../api/http';
import {ADDDISH} from '../../api/url';
export default {
    components: {
        [Upload.name]: Upload,
        [Button.name]: Button,
        [Icon.name]: Icon,
    },
    data(){
        return {
            name: '',
            type: '',
            intro:'',
            price: '',
            unit: '',
            tag: [],
            imgSrc: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1938454942,2117040084&fm=26&gp=0.jpg',
                    thumbUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1938454942,2117040084&fm=26&gp=0.jpg',
                },
            ],
        }
    },
    computed: {
        ...mapState({
            typeList: state => state.dishType.typeList
        })
    },
    methods: {
        async submitAction(){
            if(this.name == ''){
                alert('菜品名称必填!');
                return;
            }
            if(this.type == ''){
                alert('菜品分类必填!');
                return;
            }
            if(this.price == ''){
                alert('菜品价格必填!');
                return;
            }
            var res = await http.get(ADDDISH,{
                dishName: this.name,
                dishType: this.type,
                dishIntro: this.intro,
                dishPrice: this.price,
                dishUnit: this.unit,
                dishTage: JSON.stringify(this.tag),
                dishImg: this.imgSrc,
            });
            if(res.data.code == 0){
                alert('添加成功!');
                this.name = '';
                this.type = '';
                this.intro ='';
                this.price = '';
                this.unit = '';
                this.tag = [];
                this.imgSrc = '';
            }else{
                alert('添加失败!')
            }
        }
    },
    created(){
        this.$store.dispatch('dishType/getTypeList');
    }
}
</script>

<style scoped lang="scss" >
.new-dish{
    background: #fff;
    padding-top: 30px;
    >div{
        display: flex;
        margin-bottom: 10px;
        >label{
            width: 115px;
            height: 40px;
            padding-right: 15px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 12px;
            color: #666;
            i{ 
                color: red;
            }
        }
    }
    .name{
        height: 40px;
        input{
            width: 660px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #d7d7d7;
            padding-left: 10px;
            font-size: 12px;
            color: #666;
        }
    }
    .type{
        height: 40px;
        select{
            width: 660px;
            height: 40px;
            border: 1px solid #d7d7d7;
            padding-left: 10px;
            outline: none;
            font-size: 12px;
            color: #666;
        }
    }
    .intro{
        height: 180px;
        textarea{
            width: 660px;
            height: 180px;
            border: 1px solid #d7d7d7;
            font-size: 12px;
            line-height: 24px;
            padding-left: 10px;
            padding-top: 5px;
            outline: none;
            color: #666;
            resize: none;
            &::placeholder{
                color: #bbb;
            }
        }
    }
    .price{
        height: 40px;
        position: relative;
        input{
            height: 40px;
            width: 660px;
            line-height: 40px;
            border: 1px solid #d7d7d7;
            padding-left: 10px;
            font-size: 12px;
            color: #666;
        }
        span{
            position: absolute;
            font-size: 12px;
            color: #999;
            line-height: 40px;
            left: 750px;
        }
    }
    .unit{
        height: 40px;
        input{
            height: 40px;
            line-height: 40px;
            width: 660px;
            border: 1px solid #d7d7d7;
            padding-left: 10px;
            font-size: 12px;
            color: #666;
            &::placeholder{
                color: #999;
            }
        }
    }
    .tag{
        height: 40px;
        p{
            display: flex;
            align-items: center;
            margin-right: 20px;
            margin-bottom: 0;
            input{
                margin: 0;
                margin-right: 5px;
            }
            font-size: 12px;
            color: #666;
        }
    }
    .img{
        >div{
            width: calc(100% - 115px);
        }
        input{
            width: 660px;
            height: 40px;
            border: 1px solid #d7d7d7;
            line-height: 40px;
            padding-left: 10px;
            font-size: 12px;
            color: #666;
        }
    }
    .over{
        width: 100%;
        margin-top: 30px;
        border-top: 1px solid #d7d7d7;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
            width: 180px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            color: #fff;
            background: #1abc9c;
            font-size: 12px;
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
</style>
<style lang="scss">
.new-dish{
    .img{
        >div{
            .ant-upload{
                button{
                    width: 117px;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    background: #1abc9c;
                    border: 0;
                    border-radius: 4px;
                    font-size: 12px;
                    color: #fff;
                }
            }
            .ant-upload-list{
                display: flex;
                >div{
                    margin-right: 30px;
                    .ant-upload-list-item{
                        width: 150px;
                        height: 180px;
                        overflow: hidden;
                        .ant-upload-list-item-thumbnail{
                            width: 132px;
                            height: 132px;    
                        }
                        .ant-upload-list-item-image{
                            width: 132px;
                            height: 132px;  
                        }
                        .ant-upload-list-item-name{
                            display: none;
                        }
                        .ant-upload-list-item-card-actions{
                            width: 148px;
                            left: 0;
                            height: 30px;
                            background: #f9fafc;
                            border-top: 1px solid #d7d7d7;
                            top: 148px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }
            }
        }
    }
}
</style>