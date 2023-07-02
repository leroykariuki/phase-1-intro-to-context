// Function to create an employee record
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to process an array of arrays into an array of employee records
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }
  
  // Function to add a timeIn event object to an employee's record
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employee;
  }
  
  // Function to add a timeOut event object to an employee's record
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employee;
  }
  
  // Function to calculate the hours worked on a specific date
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
  
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function to calculate the wages earned on a specific date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payPerHour = employee.payPerHour;
  
    return hoursWorked * payPerHour;
  }
  
  // Function to calculate the total wages for an employee across all dates
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
  
    return datesWorked.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employee, date);
    }, 0);
  }
  
  // Function to calculate the total payroll for all employees
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
  }