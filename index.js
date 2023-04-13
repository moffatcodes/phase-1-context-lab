const helpers = require('./helpers');

// Function to create an employee record
function createEmployeeRecord(data) {
  return {
    firstName: data[0],
    familyName: data[1],
    title: data[2],
    payPerHour: data[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

// Function to add a timeIn event to an employee's record
function createTimeInEvent(dateTime) {
  let [date, hour] = dateTime.split(' ');
  this.timeInEvents.push({ type: 'TimeIn', date: date, hour: parseInt(hour, 10) });
  return this;
}

// Function to add a timeOut event to an employee's record
function createTimeOutEvent(dateTime) {
  let [date, hour] = dateTime.split(' ');
  this.timeOutEvents.push({ type: 'TimeOut', date: date, hour: parseInt(hour, 10) });
  return this;
}

// Function to calculate hours worked between timeIn and timeOut events
function hoursWorkedOnDate(date) {
  let timeIn = this.timeInEvents.find(event => event.date === date);
  let timeOut = this.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
  let hoursWorked = hoursWorkedOnDate.call(this, date);
  return hoursWorked * this.payPerHour;
}

// Function to calculate total wages earned by an employee
function allWagesFor() {
  let dates = this.timeInEvents.map(event => event.date);
  let totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
  return totalWages;
}

// Function to find an employee by their first name
function findEmployeeByFirstName(records, firstName) {
  return records.find(record => record.firstName === firstName);
}

// Function to calculate payroll for all employees
function calculatePayroll(records) {
  return records.reduce((totalPayroll, record) => totalPayroll + allWagesFor.call(record), 0);
}

module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  findEmployeeByFirstName,
  calculatePayroll
};
