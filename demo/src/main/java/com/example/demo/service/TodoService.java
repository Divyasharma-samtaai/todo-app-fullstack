package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Todo;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.TodoRepository;

@Service
public class TodoService {

    @Autowired
    private TodoRepository repository;

    public Todo createTodo(Todo todo) {
        return repository.save(todo);
    }

    public List<Todo> getAllTodos() {
        return repository.findAll();
    }

    public void deleteTodo(Long id) {
        repository.deleteById(id);
    }

public Todo getTodoById(Long id) {
    return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id " + id));
}

public Todo updateTodo(Long id, Todo updatedTodo) {
    Todo existing = repository.findById(id).orElse(null);

    if (existing != null) {
        existing.setTitle(updatedTodo.getTitle());
        existing.setCompleted(updatedTodo.isCompleted());
        return repository.save(existing);
    }

    return null;
}
}
