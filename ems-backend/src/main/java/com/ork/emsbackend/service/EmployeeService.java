package com.ork.emsbackend.service;

import java.util.List;

import com.ork.emsbackend.dto.EmployeeDto;

public interface EmployeeService {
EmployeeDto createEmployee(EmployeeDto employeeDto);

EmployeeDto getEmployeeById(Long employeeId);

List<EmployeeDto> getAllEmployees();

EmployeeDto updateEmployee(Long EmployeeId,EmployeeDto updatedEmployee);

void deleteEmployee(Long EmployeeId);
}
