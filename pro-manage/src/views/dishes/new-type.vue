<template>
  <div class="new-type">
      <div class="name">
          <label for=""><i>*</i>分类名称:</label>
          <input type="text" v-model="name">
      </div>
      <div class="sort">
          <label for=""><i>*</i>排序:</label>
          <input type="text" v-model="sort">
      </div>
      <div class="shownav">
          <label for=""><i>*</i>是否显示在导航栏:</label>
          <p><input type="radio" :value="true" v-model="showNav">是</p>
          <p><input type="radio" :value="false" v-model="showNav">否</p>
      </div>
      <div class="sub">
          <span v-if="htype == 'add'" @click="subAction">添加</span>
          <span v-if="htype == 'edit'" @click="editAction">修改</span>
      </div>
  </div>
</template>

<script>
import http from '../../api/http';
import {ADDDISHTYPE, GETTYPEDETAIL, EDITTYPE} from '../../api/url';
export default {
    data(){
        return {
            name: '',
            sort: '',
            showNav: true,
            htype: ''
        }
    },
    methods: {
        async subAction(){
            if(this.name == '' || this.sort == ''){
                alert('输入不能为空!');
                return ;
            }
            var res = await http.post(ADDDISHTYPE, {
                name: this.name,
                sort: this.sort,
                showNav: this.showNav
            });
            if(res.data.code == 0){
                alert('添加成功!');
                this.$router.push({
                    name: 'type-manager'
                })
            }else{
                alert('添加失败!');
            }
        },
        async editAction(){
            if(this.name == '' || this.sort == ''){
                alert('输入不能为空!');
                return ;
            }
            var res = await http.get(EDITTYPE, {
                id: this.id,
                typeName: this.name,
                typeSort: this.sort,
                typeShowNav: this.showNav
            });
            if(res.data.code == 0){
                alert('修改成功!');
                this.$router.push({
                    name: 'type-manager'
                })
            }else{
                alert('修改失败!');
            }
        }
    },
    async created(){
        var {type,id} = this.$route.params;
        this.htype = type;
        this.id = id;
        if(type == 'edit'){
            var { data: {data} } = await http.get(GETTYPEDETAIL, {id});
            this.name = data.typeName;
            this.sort = data.typeSort;
            this.showNav = data.typeShowNav
        }
    }
}
</script>

<style scoped lang="scss" >
.new-type{
    background: #fff;
    padding-top: 30px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    >div{
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        label{
            width: 125px;
            margin-right: 20px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 12px;
            color: #666;
            i{
                color: red;
            }
        }
    }
    .name,.sort{
        input{
            height: 40px;
            width: 660px;
            border: 1px solid #d7d7d7;
            font-size: 12px;
            padding-left: 10px;
        }
    }
    .shownav{
        p{
            line-height: 40px;
            margin-right: 20px;
            margin-bottom: 0;
            display: flex;
            align-items: center;
            input{
                margin-right: 5px;
            }
        }
    }
    .sub{
        margin-top: 100px;
        border-top: 1px solid #d7d7d7;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0;
        span{
            width: 180px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            background: #1abc9c;
            font-size: 12px;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
        }
    }
}
</style>