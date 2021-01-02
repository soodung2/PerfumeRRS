let imageLoaded = false;
//이미지 선택
$("#image-selector").change(function () { //jquery  html에 image-selector 클래스 값이 change 시 실행되는 코드
	imageLoaded = false;
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
		$("#prediction-list").empty();
		imageLoaded = true;
	}
	
	let file = $("#image-selector").prop('files')[0]; //선택한 파일 속성값 추가 
	reader.readAsDataURL(file);
});
//weight모델 들고오기 
let model;
let modelLoaded = false;
$( document ).ready(async function () {
	modelLoaded = false;
	$('.progress-bar').show();
    console.log( "Loading model..." );
    model = await tf.loadGraphModel('model/model.json');
    console.log( "Model loaded." );
	$('.progress-bar').hide();
	modelLoaded = true;
});
//선택된 이미지 tensor로 변환 
$("#predict-button").click(async function () {
	if (!modelLoaded) { alert("The model must be loaded first"); return; }
	if (!imageLoaded) { alert("Please select an image first"); return; }
	
	let image = $('#selected-image').get(0);
	
	// Pre-process the image
	console.log( "Loading image..." );
	let tensor = tf.browser.fromPixels(image, 3)
		.resizeNearestNeighbor([224, 224]) // 이미지 사이즈 바꿔주기 
		.expandDims()
		.toFloat()
		.reverse(-1); // RGB -> BGR
    //예측하기 
	let predictions = await model.predict(tensor).data();
	console.log(predictions);
	let top5 = Array.from(predictions)
		.map(function (p, i) { // this is Array.map
			return {
				probability: p,
				className: TARGET_CLASSES[i] // we are selecting the value from the obj
			};
		}).sort(function (a, b) {
			return b.probability - a.probability;
		}).slice(0, 1); //예측되는거 가장 높은 값만 나오게

	$("#prediction-list").empty();
	top5.forEach(function (p) {  //리스트 받아온거 다 보여줄순 있지만 일단 예측값 하나만 보여주기 
		$("#prediction-list").append(`${p.className}: ${p.probability.toFixed(6)}`);
		// $("#perfume-data").load("data.html")
		});
		var result = top5[0].className;

		// $(function(){
		// 	$("#perfume-data").click(function(){
		// 		  location.href = ' data.html';
		// 		 });
		// 		});
	// $("#perfume-data").load(result + '.html')

	$("#perfume-data").load('data.html #'+result)

		// $(function(){ $("#perfume-data").load("data.html"); });

		
});
