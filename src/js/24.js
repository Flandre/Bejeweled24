function test(){
	console.log("fulan is baka");
}




var goal  = 24;
var equal=0.000001;

function foo(arr){
	for(var i=0;i<arr.length;i++){
		arr[i]=parseInt(arr[i]);
	}
	return is24(arr);
}

var outputret=true;

function is24(arr){
	if(arr.length!=4){
		alert('wrong arr');
		return;
	}
	for(var j=0;j<arr.length;j++){
		var tmp = new Array();
		for(var k=0;k<arr.length;k++){
			tmp[k]=arr[k];
		}
		tmp.splice(j,1);
		if(can(tmp,arr[j],goal)){
			
			return true;
		}
	}
	if(judge2x2(arr,12)){
		return true;
	}
	if(judge2x2(arr,13)){
		return true;
	}
	if(judge2x2(arr,14)){
		return true;
	}
	return false;
}

function judge2x2(arr,type){
	var p1;
	var p2;
	var p3;
	var p4;
	if(type==12){
		p1=0;
		p2=1;
		p3=2;
		p4=3;
	}else if(type==13){
		p1=0;
		p2=2;
		p3=1;
		p4=3;
	}else if(type==14){
		p1=0;
		p2=3;
		p3=1;
		p4=2;
	}
	var t12list = retlist(arr[p1],arr[p2]);
	for(var i=0;i<t12list.length;i++){
		if(can([arr[p3],arr[p4]],t12list[i],goal)){
			var ret = t12list[i];
			var last = arr[p2];
			if(outputret){
				if(i==0){
					console.log((ret-last)  + "+" + last + "=" + ret);
				}else if(i==1){
					console.log((ret+last)  + "-" + last + "=" + ret);
				}else if(i==2){
					console.log((ret/last)  + "*" + last + "=" + ret);
				}else if(i==3){
					console.log((ret*last)  + "/" + last + "=" + ret);
				}else if(i==4){
					console.log(last  + "-" + (last-ret) + "=" + ret);
				}else if(i==5){
					console.log(last  + "/" + (last/ret) + "=" + ret);
				}				
			}
			return true;
		}
	}
}


function eq(x,y){
	if(Math.abs(x-y)<equal){
		//console.log('true')
		return true;
	}else{
		return false;
	}
}

function can(arr,last,ret){
	if(arr.length==0){
		return eq(last,ret);
	}else{
		var goallist = [ret+last,ret-last,ret*last,ret/last,last-ret,last/ret];
		var type=1;
		if(last==0){
			goallist = [ret];
			type=2;
		}
		for(var i=0;i<goallist.length;i++){
			for(var j=0;j<arr.length;j++){
				var tmp = new Array();
				for(var k=0;k<arr.length;k++){
					tmp[k]=arr[k];
				}
				tmp.splice(j,1);
				if(can(tmp,arr[j],goallist[i])){
					if(outputret){
						if(type==1){
							if(i==0){
								console.log((ret+last)  + "-" + last + "=" + ret);
							}else if(i==1){
								console.log((ret-last)  + "+" + last + "=" + ret);
							}else if(i==2){
								console.log((ret*last)  + "/" + last + "=" + ret);
							}else if(i==3){
								console.log((ret/last)  + "*" + last + "=" + ret);
							}else if(i==4){
								console.log(last  + "-" + (last-ret) + "=" + ret);
							}else if(i==5){
								console.log(last  + "/" + (last/ret) + "=" + ret);
							}
						}else{
							if(i==0){
								console.log((ret+last)  + "-" + last + "=" + ret);
							}
						}
					}
					return true;
				}
			}
		}
		return false;
	}
}


function retlist(a,b){
	return [a+b,a-b,a*b,a/b,b-a,b/a];
}


function test24(){
	var t1 = new Date().getTime();
	var max=100;
	for(var i=0;i<10000;i++){
		var x = [Math.ceil(Math.random()*max),Math.ceil(Math.random()*max),Math.ceil(Math.random()*max),Math.ceil(Math.random()*max)];
		is24(x);
		if(i%1000==0){
			console.log(i);
		}
	}
	var t2 = new Date().getTime();
	console.log("time cost:"+(t2-t1));
}

Array.prototype.unique = function()
{
	var n = {},r=[]; //n为hash表，r为临时数组
	for(var i = 0; i < this.length; i++) //遍历当前数组
	{
		if (!n[this[i]]) //如果hash表中没有当前项
		{
			n[this[i]] = true; //存入hash表
			r.push(this[i]); //把当前数组的当前项push到临时数组里面
		}
	}
	return r;
}

