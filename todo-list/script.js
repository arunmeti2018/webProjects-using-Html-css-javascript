let html = '';
document.querySelector('#new-tasks button')
    .addEventListener('click', () => {
        if (document.querySelector('#new-tasks input').value.length === 0)
            alert("Please enter a task");

        else {
            document.querySelector('#tasks').innerHTML +=
                `
              <div class="task">

                <div class="task-name">
                  ${document.querySelector('#new-tasks input').value}
                </div>
                <button class="delete-button"><i class="fa-regular fa-trash-can"></i></button>
               </div>

            `;
            let currentTasks = document.querySelectorAll('.delete-button')
                .forEach((button) => {
                    button.addEventListener('click', () => {
                        button.parentNode.remove();
                        console.log(button.parentNode);
                    })

                })
            document.querySelectorAll('.task')
                .forEach((element) => {
                    element.addEventListener('click', () => {

                        element.classList.toggle('completed');
                    })
                })

            document.querySelector('#new-tasks input').value = '';
        }

    })

