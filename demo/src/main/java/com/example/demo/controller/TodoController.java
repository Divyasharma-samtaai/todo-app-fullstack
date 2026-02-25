package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Todo;
import com.example.demo.service.TodoService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/todos")

public class TodoController {

    @Autowired
    private TodoService service;

    // @PostMapping
    // public Todo createTodo(@RequestBody Todo todo) {
    //     return service.createTodo(todo);
    // }

    @PostMapping
    public Todo createTodo(@Valid @RequestBody Todo todo) {
    return service.createTodo(todo);
}

    @GetMapping
    public List<Todo> getAllTodos() {
        return service.getAllTodos();
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        service.deleteTodo(id);
    }

    @GetMapping("/{id}")
    public Todo getById(@PathVariable Long id) {
    return service.getTodoById(id);
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo todo) {
        return service.updateTodo(id, todo);
    }
}
