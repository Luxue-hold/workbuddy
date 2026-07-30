// 元鼓鼓工作台基础逻辑


const views = {

overview: `
<div class="card">
<h2>🌸 今日概览</h2>
<p>欢迎回来，开始管理今天吧。</p>
</div>

<div class="stat">

<div class="stat-item">
<h3>📋</h3>
<p>计划</p>
</div>

<div class="stat-item">
<h3>💪</h3>
<p>健身</p>
</div>

<div class="stat-item">
<h3>😊</h3>
<p>心情</p>
</div>

</div>
`,

plan:`
<div class="card">
<h2>📋 每日计划</h2>
<p>记录今天的重要任务。</p>
<textarea style="width:100%;height:150px"></textarea>
</div>
`,

diet:`
<div class="card">
<h2>🍱 饮食记录</h2>
<p>记录今天吃了什么。</p>
<textarea style="width:100%;height:150px"></textarea>
</div>
`,

fitness:`
<div class="card">
<h2>💪 健身记录</h2>
<p>记录运动情况。</p>
<textarea style="width:100%;height:150px"></textarea>
</div>
`,

mood:`
<div class="card">
<h2>😊 心情记录</h2>
<textarea style="width:100%;height:150px"></textarea>
</div>
`,

review:`
<div class="card">
<h2>📝 每日复盘</h2>
<textarea style="width:100%;height:150px"></textarea>
</div>
`,

time:`
<div class="card">
<h2>⏱ 时间追踪</h2>
<p>记录时间使用情况。</p>
</div>
`,

sleep:`
<div class="card">
<h2>😴 睡眠记录</h2>
<p>记录睡眠质量。</p>
</div>
`,

finance:`
<div class="card">
<h2>💰 记账</h2>
<p>记录收入和支出。</p>
</div>
`

};



const appView=document.getElementById("app-view");

const title=document.getElementById("view-title");



function showView(name){

appView.innerHTML=views[name] || views.overview;

title.innerText=
document.querySelector(`[data-view="${name}"]`)
?.innerText || "概览";


document.querySelectorAll(".nav-item")
.forEach(btn=>{

btn.classList.remove("active");

if(btn.dataset.view===name){
btn.classList.add("active");
}

});



saveData();

}



//菜单点击

document.querySelectorAll(".nav-item")
.forEach(btn=>{

btn.addEventListener("click",()=>{

showView(btn.dataset.view);

});

});




// 日期

const dateInput=document.getElementById("date-select");

dateInput.value=
new Date().toISOString().slice(0,10);



document.getElementById("view-date").innerText=
dateInput.value;



dateInput.addEventListener("change",()=>{

document.getElementById("view-date").innerText=
dateInput.value;

});




// 导出

document.getElementById("btn-export")
.onclick=function(){

const data={
date:dateInput.value,
time:new Date()
};


const blob=
new Blob(
[JSON.stringify(data,null,2)],
{type:"application/json"}
);


const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="workbuddy-data.json";

a.click();

};



// 保存

function saveData(){

localStorage.setItem(
"workbuddy-last",
JSON.stringify({
time:new Date()
})
);

}



//启动

showView("overview");
