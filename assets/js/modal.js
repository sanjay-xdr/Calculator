
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let modalContent = document.querySelector(".modal-content");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modalContent.innerHTML = `<p class="heading">History</p>`;
  modal.style.display = "block";
  let userHistory = localStorage.getItem("Userhistory");
  userHistory = JSON.parse(userHistory);
  if(userHistory){
    userHistory.forEach((item) => {
      let span2 = document.createElement("span");
      span2.setAttribute('class', 'query');
      span2.textContent = "Query :  " + item.query;
      let h3 = document.createElement("h3");
      h3.textContent =  "Result : " + item.result;
      h3.setAttribute('class', 'result');
      let hr = document.createElement("hr");
      modalContent.appendChild(span2);
      modalContent.appendChild(h3);
      modalContent.appendChild(hr);
    });
  }else{
     let span1 = document.createElement('span');
      span1.textContent = " No History Found";
      span1.setAttribute('class', 'query');
      modalContent.appendChild(span1);
  }
 
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};