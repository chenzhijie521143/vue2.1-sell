<template>
  <div class="header">{{ msg }}
  </div>
</template>

<script>
export default{
  data () {
    return {
      msg: 'header'
    }
  }
};
</script>

<style>
	.header{
		font-size:30px;
		text-align: center;
		color:#42B983;
	}
</style>