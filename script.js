'use strict';

var STUDENT_NUMBER_PATTERN;
var EMAIL_PATTERN;

var WORKSHOP_FEES = {
  'Web Development': 500,
  'UI/UX Design': 400,
  'Cybersecurity': 600
};

const studentName = document.getElementById('studentName');
const studentNumber = document.getElementById('studentNumber');
const email = document.getElementById('email');
const workshop = document.getElementById('workshop');
const studentTypeRegular = document.getElementById('studentTypeRegular');
const studentTypeScholar = document.getElementById('studentTypeScholar');
const terms = document.getElementById('terms');
const nameError = document.getElementById('nameError');
const studentNumberError = document.getElementById('studentNumberError');
const emailError = document.getElementById('emailError');
const workshopError = document.getElementById('workshopError');
const termsError = document.getElementById('termsError');
const registrationFee = document.getElementById('registrationFee');
const discount = document.getElementById('discount');
const finalFee = document.getElementById('finalFee');
const registerBtn = document.getElementById('registerBtn');
const clearBtn = document.getElementById('clearBtn');
const registrationResult = document.getElementById('registrationResult');
const summaryName = document.getElementById('summaryName');
const summaryStudentNumber = document.getElementById('summaryStudentNumber');
const summaryEmail = document.getElementById('summaryEmail');
const summaryWorkshop = document.getElementById('summaryWorkshop');
const summaryStudentType = document.getElementById('summaryStudentType');
const summaryFee = document.getElementById('summaryFee');
const summaryDiscount = document.getElementById('summaryDiscount');
const summaryFinalFee = document.getElementById('summaryFinalFee');

const studentNumberPattern = /^\d{2}-\d{4}-\d{3}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStudentInfo(name, studentNumber, email) {
  const trimmedName = name.trim();
  if (trimmedName.length < 3 || /\d/.test(trimmedName)) return false;
  if (!studentNumberPattern.test(studentNumber)) return false;
  if (!emailPattern.test(email)) return false;
  return true;
}

function calculateFinalFee(workshop, studentType) {
  let baseFee = 0;
  if (workshop === "Web Development") baseFee = 500;
  else if (workshop === "UI/UX Design") baseFee = 400;
  else if (workshop === "Cybersecurity") baseFee = 600;
  
  let discountAmount = 0;
  if (studentType === "Scholar") discountAmount = baseFee * 0.2;
  
  return baseFee - discountAmount;
}

function getSelectedStudentType() {
  if (studentTypeRegular.checked) return "Regular Student";
  if (studentTypeScholar.checked) return "Scholar";
  return "";
}

function updateFees() {
  const selectedWorkshop = workshop.value;
  const studentType = getSelectedStudentType();
  
  let baseFee = 0;
  if (selectedWorkshop === "Web Development") baseFee = 500;
  else if (selectedWorkshop === "UI/UX Design") baseFee = 400;
  else if (selectedWorkshop === "Cybersecurity") baseFee = 600;
  
  let discountAmt = 0;
  if (studentType === "Scholar") discountAmt = baseFee * 0.2;
  
  registrationFee.textContent = "₱" + baseFee;
  discount.textContent = "₱" + discountAmt;
  finalFee.textContent = "₱" + (baseFee - discountAmt);
}

function resetAll() {
  studentName.value = "";
  studentNumber.value = "";
  email.value = "";
  workshop.selectedIndex = 0;
  studentTypeRegular.checked = false;
  studentTypeScholar.checked = false;
  terms.checked = false;
  nameError.textContent = "";
  studentNumberError.textContent = "";
  emailError.textContent = "";
  workshopError.textContent = "";
  termsError.textContent = "";
  registrationFee.textContent = "₱0";
  discount.textContent = "₱0";
  finalFee.textContent = "₱0";
  registrationResult.style.display = "none";
}

workshop.addEventListener('change', updateFees);
studentTypeRegular.addEventListener('change', updateFees);
studentTypeScholar.addEventListener('change', updateFees);

registerBtn.addEventListener('click', function(e) {
  e.preventDefault();
  
  nameError.textContent = "";
  studentNumberError.textContent = "";
  emailError.textContent = "";
  workshopError.textContent = "";
  termsError.textContent = "";
  
  let isValid = false;
  
  if (!validateStudentInfo(studentName.value, studentNumber.value, email.value)) {
    const trimmed = studentName.value.trim();
    if (trimmed.length < 3 || /\d/.test(trimmed)) {
      nameError.textContent = "Enter a valid student name.";
      isValid = false;
    }
    if (!studentNumberPattern.test(studentNumber.value)) {
      studentNumberError.textContent = "Enter a valid student number.";
      isValid = false;
    }
    if (!emailPattern.test(email.value)) {
      emailError.textContent = "Enter a valid email address.";
      isValid = false;
    }
  }
  
  if (!workshop.value || workshop.value === "") {
    workshopError.textContent = "Please select a workshop.";
    isValid = false;
  }
  
  if (!terms.checked) {
    termsError.textContent = "You must accept the Terms and Conditions.";
    isValid = false;
  }
  
  if (!isValid) {
    registrationResult.style.display = "none";
    return;
  }
  
  const sType = getSelectedStudentType();
  let baseFee = 0;
  if (workshop.value === "Web Development") baseFee = 500;
  else if (workshop.value === "UI/UX Design") baseFee = 400;
  else if (workshop.value === "Cybersecurity") baseFee = 600;
  
  let discAmt = 0;
  if (sType === "Scholar") discAmt = baseFee * 0.2;
  const final = baseFee - discAmt;
  
  summaryName.textContent = studentName.value;
  summaryStudentNumber.textContent = studentNumber.value;
  summaryEmail.textContent = email.value;
  summaryWorkshop.textContent = workshop.value;
  summaryStudentType.textContent = sType || "Not specified";
  summaryFee.textContent = "₱" + baseFee;
  summaryDiscount.textContent = "₱" + discAmt;
  summaryFinalFee.textContent = "₱" + final;
  
  registrationResult.style.display = "block";
});

clearBtn.addEventListener('click', resetAll);

document.addEventListener('DOMContentLoaded', function() {
  registrationResult.style.display = "none";
  registrationFee.textContent = "₱0";
  discount.textContent = "₱0";
  finalFee.textContent = "₱0";
});