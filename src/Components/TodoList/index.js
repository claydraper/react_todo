// External Dependencies
import React, {useState} from 'react';
import styled from 'styled-components';
import uuid from 'uuid';

// Internal Dependencies
import AddTodo from '../AddTodo/index';

// Styled Components
const Form = styled.form`
  width: 400px;
  display: flex;
  align-self: center;
  background: lightgray;
  border-radius: 5px;
  background: rgba(84, 13, 166, 0.5);
  border: 2px solid white;
  margin: 5.5rem 0;
`

const Ul = styled.ul`
    width: 100%;
    max-height: auto;
    padding-top: 3.25rem;
    padding-bottom: 0;
    margin-bottom: 2rem;
`

const Wrapper = styled.div`
    display: flex;
    margin: 7px;
    justify-content: center;
`

const Checkbox = styled.div({
    width: '23px',
    height: '23px',
    borderRadius: '50%',
    marginRight: '10px',
    border: '1px solid white',
    padding: '2px',

    '&:hover': {
        background: '#a46dd1',
        cursor: 'pointer',
    }
})

const Input = styled.input((props) => {
    
    return ({
    width: '80%',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    paddingLeft: '5px',
    background: '#c3a6e3',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: '500',
    fontSize: '18px',
    textDecoration: props.isCompleted ? 'line-through' : 'none',
})})
    

const I = styled.i((props) => ({
    color: '#e8ed8a',
    fontSize: '16px',
    display: props.isCompleted ? 'block' : 'none',
}))

const DeleteButton = styled.i({
    color: 'rgba(84, 13, 166, 0.5)',
    fontSize: '16px',
    padding: '4px',
    borderRadius: '3px',
    marginLeft: '10px',

    '&:hover': {
        background: '#f54636',
        cursor: 'pointer',
        color: 'white',
    }
})


// Component Definition
const TodoList = () => {
   const [todos, setTodos] = useState([
        {
            id: uuid(),
            content: 'Wash dishes',
            isCompleted: true,
        },
        {
            id: uuid(),
            content: 'Complete todo app',
            isCompleted: true,
        },
        {   id: uuid(),
            content: 'Solve world hunger',
            isCompleted: false,
        }
    ]);
    console.log({todos})

    const handleKeyDown = (e, i) => {
        if(e.key === 'Enter'){
            createTodo(e, i)
        }
        if(e.key === 'Backspace' && todos[i].content === ''){
            deleteTodo(e, i)
        }
    }

    const createTodo = (e, i) => {
        const newTodos = [...todos];
        newTodos.splice(i + 1, 0, {
            id: uuid(),
            content: '',
            isCompleted: false,
        })
        setTodos(newTodos);
        setTimeout(() => {
            document.forms[1].elements[i + 1].focus()
        }, 0);
    }

    const createTodoButton = () => {
        const newTodos = [...todos];
        console.log(newTodos);
        newTodos.push({
            id: uuid(),
            content: '',
            isCompleted: false,
        });
        setTodos(newTodos);
        setTimeout(() => {
            document.forms[1].elements[newTodos.length - 1].focus()
        }, 0);
    }

    const deleteTodo = (e, i) => {
        if(i === 0 && todos.length === 1) return;
        const newTodos = todos.filter(todo => todo.id !== todos[i].id);
        setTodos(newTodos);
        if(i === 0) return;
        setTimeout(() => {
            document.forms[1].elements[i - 1].focus();
        }, 0)
    }

    const deleteTodoButton = (e, i) => {
        const newTodos = todos.filter(todo => todo.id !== todos[i].id);
        setTodos(newTodos);
    }

    const updateTodo = (e, i) => {
        const newTodos = [...todos];
        newTodos[i].content = e.target.value
        setTodos(newTodos);
    }

    const toggleTodo = (e, i) => {
        const newTodos = [...todos];
        newTodos[i].isCompleted = !newTodos[i].isCompleted;
        setTodos(newTodos);
        console.log(todos);
    }


    return (
        <Form>
            <AddTodo createTodoButton={createTodoButton}/>
            <Ul>
                {todos.map((todo, i) => (
                    <Wrapper key={todo.id}>
                        <Checkbox onClick={e => toggleTodo(e, i)}>
                            <I 
                            className="fas fa-check" 
                            isCompleted={todo.isCompleted}
                            />
                        </Checkbox>
                        <Input 
                        isCompleted={todo.isCompleted}
                        value={todo.content} 
                        onKeyDown={e => handleKeyDown(e, i)}
                        onChange={e => updateTodo(e, i)}
                        />
                        <DeleteButton 
                        className="fas fa-trash-alt"
                        onClick={e => deleteTodoButton(e, i)} 
                        />
                    </Wrapper>
                ))}
            </Ul>
        </Form>
    )
}

export default TodoList;