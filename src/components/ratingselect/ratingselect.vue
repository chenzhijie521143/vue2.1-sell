<template>
    <div class="ratingselect">
        <div class="rating-type border-b-1px">
            <span class="block positive"
            	:class="{'active':selectType===2}"
            	@click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="block positive"
            	:class="{'active':selectType===0}"
            	@click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span class="block negative"
            	:class="{'active':selectType===1}"
            	@click="select(1,$event)">{{desc.negative}}<span class="count">{{nagetives.length}}</span></span>
        </div>
        <div class="switch" 
        	:class="{'on':onlyContent}"
        	@click="toggleContent">
        	<span class="icon-check_circle"></span>
        	<span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default{
		data(){
			return{
				sType:this.selectType,
				oContent:this.onlyContent
			}
		},
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return {
						all:'全部',
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		},
		computed:{
			// 计算出推荐的数组 js方法
			positives(){
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				});
			},
			// 计算出吐槽的数组  js方法
			nagetives(){
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				});
			}
		},
		methods:{  // 子组件自定义事件，将改变的数据传给父组件
			       // 不要直接改变props中的数据 ，在data中定义变量(在子组件中使用自定义的变量)，将props中需要改变的数据赋值
			select(type,event){
				if(!event._constructed){
				    return;
			    }
				this.sType=type;
				this.$emit('ratingtype-select',type);
			},
			toggleContent(event){
				if(!event._constructed){
				    return;
			    }
				this.oContent=!this.oContent;
				this.$emit('content-toggle',this.oContent);
			}
		}
	};
</script>

<style lang="scss" scoped>
@import "../../common/styles/mixin.scss";
.ratingselect{
    .rating-type{
        padding:18px 0;
        margin:0 18px;
        @include border-b-1px(rgba(7, 17, 27, 0.1));
        font-size:0;
        .block{
        	display:inline-block;
        	padding:8px 12px;
        	border-radius:1px;
        	font-size:12px;
        	margin-right:8px;
        	color:rgb(77,85,93);
        	&.active{
        		color:#fff;
        	}
        	.count{
        		font-size:8px;
        		margin-left:2px;
        	}
            &.positive{
            	background:rgba(0,160,220,0.2);
            	&.active{
            		background:rgb(0,160,220);
            	}
            }
            &.negative{
            	background:rgba(77,85,93,0.2);
            	&.active{
            		background:rgb(77,85,93);
            	}
            }
        }	
    }
    .switch{
    	padding:12px 18px;
    	line-height: 24px;
    	border-bottom:1px solid rgba(7,17,27,0.1);
    	color:rgb(147,153,159);
    	font-size:0;
    	&.on{
    		.icon-check_circle{
    			color:#00c850;
    		}
    	}
    	.icon-check_circle{
    		display:inline-block;
    		vertical-align:top;
    		margin-right:4px;
    		font-size:24px;
    	}
    	.text{
    		display:inline-block;
    		font-size:12px;
    	}
    }
}
</style>