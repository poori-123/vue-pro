<template>
  <div class="scroll-box" ref="scroll">
      <div class="scroll-wrap">
          <slot/>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        chooseId: String
    },
    watch: {
        chooseId(){
            this.$nextTick( ()=>{
                this.scroll.refresh();
            } )
            
        }
    },
    mounted(){
        this.scroll = new IScroll(this.$refs.scroll, {
            click: false,
            tap: false,
            probeType: 3,

        });
        this.scroll.on('beforeScrollStart', ()=>{
            this.scroll.refresh();
        })
    }
}
</script>

<style>

</style>