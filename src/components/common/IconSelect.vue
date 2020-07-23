<template>
	<span>
	<!-- 图标选择插件 -->
	<el-select v-model="iconCls" placeholder="请选择" @change="changeValue">
		<el-option-group v-for="group in iconGroup" :label="group.label">
			<el-option v-for="icon in group.icons" :label="group.prefix + icon + group.suffix" :value="group.prefix + icon + group.suffix">
				<span style="float: left">{{ group.prefix + icon + group.suffix }}</span>
				<span style="float: right"><i :class="group.prefix + icon + group.suffix"/></span>
			</el-option>
		</el-option-group>
	</el-select>
	<i :class="iconCls"/>
	</span>
</template>
<script>
    export default {
		data() {
			return {
				iconCls: this.value,
				iconGroup: [{
					label: 'element',
					prefix: 'el-icon-',
					suffix: '',
					icons: ['setting','check','circle-check','circle-cross','close','upload',
						'd-caret','date','delete','document',
						'edit','information','loading','menu','message','minus','more',
						'picture','plus','search','share','star-off','star-on','time',
						'warning','delete2','upload2','view']
				}, {
					label: 'font-awesome',
					prefix: 'fa ',
					suffix: ' fa-fw',
					icons: ['fa-id-card','fa-calendar','fa-calculator','fa-cogs',
							'fa-desktop','fa-user','fa-windows','fa-th-list','fa-undo','fa-save',
							'fa-spinner','fa-refresh','fa-user-circle-o','fa-trash','fa-envelope',
							'fa-download','fa-code']
				}],
			}
		},
		props: ['value'],
		methods: {
			changeValue(val) {
				this.$emit('input', val);
			}
		},
		watch: {
			value(val) {
				this.iconCls = val;
			}
		}
    }
</script>