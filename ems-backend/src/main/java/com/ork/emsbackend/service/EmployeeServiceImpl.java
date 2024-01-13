package com.ork.emsbackend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ork.emsbackend.dto.EmployeeDto;
import com.ork.emsbackend.entity.Employee;
import com.ork.emsbackend.exception.ResourceNotFoundException;
import com.ork.emsbackend.mapper.EmployeeMapper;
import com.ork.emsbackend.repository.EmployeeRepository;
@Service
public class EmployeeServiceImpl implements EmployeeService{
	private EmployeeRepository employeeRepository;
	@Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}
	@Override
	public EmployeeDto getEmployeeById(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId)
		.orElseThrow(()-> new ResourceNotFoundException("Employee does not exist with given id : "+employeeId));
		
		return EmployeeMapper.mapToEmployeeDto(employee);
	}
	@Override
	public List<EmployeeDto> getAllEmployees() {
		List<Employee> employees = employeeRepository.findAll();
		return employees.stream().map((employee)-> EmployeeMapper.mapToEmployeeDto(employee))
				.collect(Collectors.toList());
	}
	@Override
	public EmployeeDto updateEmployee(Long EmployeeId, EmployeeDto updatedEmployee) {
		Employee employee = employeeRepository.findById(EmployeeId).orElseThrow(
				()-> new ResourceNotFoundException("Employee is not Found with given id : "+EmployeeId));
		employee.setFirstName(updatedEmployee.getFirstName());
		employee.setLastName(updatedEmployee.getLastName());
		employee.setEmail(updatedEmployee.getEmail());
		Employee updatedEmployees = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(updatedEmployees);
	}
	@Override
	public void deleteEmployee(Long EmployeeId) {
		Employee employee = employeeRepository.findById(EmployeeId).orElseThrow(
				()-> new ResourceNotFoundException("Employee is not Found with given id : "+EmployeeId));
		employeeRepository.deleteById(EmployeeId);
	}

}
