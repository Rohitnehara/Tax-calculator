// Import required modules and functions
const $ = require('jquery');
const { describe, beforeEach, test, expect } = require('@jest/globals');

// Import the calculateTax function
// Note: You may need to adjust the path to the file containing the calculateTax function
const { calculateTax } = require('../js/script');

// Mocking jQuery functions and DOM setup
beforeEach(() => {
    // Mock the required DOM elements using jQuery
    document.body.innerHTML = `
        <input id="age" type="text">
        <input id="income" type="text">
        <input id="extraIncome" type="text">
        <input id="deductions" type="text">
        <div id="resultBody"></div>
        <div id="resultModal"></div>
    `;
    $('#resultModal').modal = jest.fn(); // Mock jQuery modal function
});

// Describe the test suite for calculateTax function
describe('calculateTax', () => {
    test('calculates tax correctly for age < 40', () => {
        // Set up input values
        $('#age').val('<40');
        $('#income').val('1000000');
        $('#extraIncome').val('100000');
        $('#deductions').val('200000');
        
        // Call the function
        calculateTax();
        
        // Check that the modal was shown
        expect($('#resultModal').modal).toHaveBeenCalled();
        
        // Check the output in the resultBody
        const resultHtml = $('#resultBody').html();
        expect(resultHtml).toContain('Total Income: 900000.00');
        expect(resultHtml).toContain('Tax Amount: 30000.00');
    });
    
    // Add more test cases for different age ranges and scenarios
    test('calculates tax correctly for age >= 40 and < 60', () => {
        // Set up input values
        $('#age').val('>=40&<60');
        $('#income').val('1000000');
        $('#extraIncome').val('100000');
        $('#deductions').val('200000');
        
        // Call the function
        calculateTax();
        
        // Check that the modal was shown
        expect($('#resultModal').modal).toHaveBeenCalled();
        
        // Check the output in the resultBody
        const resultHtml = $('#resultBody').html();
        expect(resultHtml).toContain('Total Income: 900000.00');
        expect(resultHtml).toContain('Tax Amount: 40000.00');
    });
    
    test('calculates tax correctly for age >= 60', () => {
        // Set up input values
        $('#age').val('>=60');
        $('#income').val('1000000');
        $('#extraIncome').val('100000');
        $('#deductions').val('200000');
        
        // Call the function
        calculateTax();
        
        // Check that the modal was shown
        expect($('#resultModal').modal).toHaveBeenCalled();
        
        // Check the output in the resultBody
        const resultHtml = $('#resultBody').html();
        expect(resultHtml).toContain('Total Income: 900000.00');
        expect(resultHtml).toContain('Tax Amount: 10000.00');
    });
});
