package com.ork.emsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ork.emsbackend.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
