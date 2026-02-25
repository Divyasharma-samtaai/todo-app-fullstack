package com.example.demo.service;

import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Todo;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.TodoRepository;

@Service
public class TodoService {

    private final TodoRepository repository;

        public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

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
        Todo existingTodo = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        existingTodo.setTitle(updatedTodo.getTitle());
        existingTodo.setCompleted(updatedTodo.isCompleted());

        return repository.save(existingTodo);
    }
}
