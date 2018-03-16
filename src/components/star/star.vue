<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>

<script>
	
	const LENGTH=5;
	const CLS_ON="on";
	const CLS_HALF="half";
	const CLS_OFF="off";
	
	export default{
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			// 星级 类型
			starType(){
				return 'star-'+this.size;
			},
			// 返回评星 数组
			itemClasses(){
				let result=[];
				let score=Math.floor(this.score * 2)/2;
				let hasDecimal=score % 1 !==0; //是否有半星
				let integer=Math.floor(score); //全星个数
				
				//全星
				for(let i=0;i<integer;i++){
					result.push(CLS_ON);
				}
				//半星，一个
				if(hasDecimal){
					result.push(CLS_HALF);
				}
				//无星
				while(result.length<LENGTH){
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	};
</script>

<style lang="scss" scoped>
  @import "../../common/styles/mixin.scss";
  .star{
  	.star-item{
  	   display: inline-block;
  	   background-repeat: no-repeat;	
  	}
  	&.star-48{
  	   .star-item{
  	   	  width:20px;
  	   	  height:20px;
  	   	  margin-right:22px;
  	   	  background-size:20px 20px;
  	   	  &:last-child{
  	   	  	margin-right:0;
  	   	  }
  	   	  &.on{
  	   	  	@include bg-image('img/star48_on');
  	   	  }
  	   	  &.half{
  	   	  	@include bg-image('img/star48_half');
  	   	  }
  	   	  &.off{
  	   	  	@include bg-image('img/star48_off');
  	   	  }
  	   }
  	}
  	&.star-36{
  		.star-item{
  	   	  width:15px;
  	   	  height:15px;
  	   	  margin-right:6px;
  	   	  background-size:15px 15px;
  	   	  &:last-child{
  	   	  	margin-right:0;
  	   	  }
  	   	  &.on{
  	   	  	@include bg-image('img/star36_on');
  	   	  }
  	   	  &.half{
  	   	  	@include bg-image('img/star36_half');
  	   	  }
  	   	  &.off{
  	   	  	@include bg-image('img/star36_off');
  	   	  }
  	   }
  	}
  	&.star-24{
  		.star-item{
  	   	  width:10px;
  	   	  height:10px;
  	   	  margin-right:3px;
  	   	  background-size:10px 10px;
  	   	  &:last-child{
  	   	  	margin-right:0;
  	   	  }
  	   	  &.on{
  	   	  	@include bg-image('img/star24_on');
  	   	  }
  	   	  &.half{
  	   	  	@include bg-image('img/star24_half');
  	   	  }
  	   	  &.off{
  	   	  	@include bg-image('img/star24_off');
  	   	  }
  	   }
  	}
  }
</style>