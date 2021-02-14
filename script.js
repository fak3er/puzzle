window.onload=()=>{
    //replay button 
    replay=document.querySelector('.replay')
    replay.onclick=()=>{
        window.location.reload()
    }
    //the puzzle result variable
   let result=false
    //creating array with grid positions
    let array=[]
    for(let i=1;i<=4;i++){
        for(let j=1;j<=3;j++){
            array.push([i,j])
        }
    }
    arrayCopy=[...array]
    for([key,value]of array.entries())
    {
        console.log([key,value])
    }
    //inserting frames in grid container in  random order 
    let frames=document.querySelector('.container').children
    let frame=0;
    while(array.length>0)
    {
        if(array.length>1)
        index=Math.round(Math.random()*(array.length-1))
        else
        index=0
        frames[frame].style.gridColumn=array[index][1]
        frames[frame].style.gridRow=array[index][0]
        console.log(array[index])
        frame++
        array.splice(index,1)
    }
    //adding mousedown event listener for each frame
    for(frame of frames){
        frame.addEventListener('mousedown',drag)
    }
    function drag(e){
        let aux=false
        const event = new MouseEvent('mousedown',{
            view: window , 
            bubbles: false,
            cancelable: true
        })
        e.target.style.width=e.target.clientWidth+"px"
        e.target.style.height=e.target.clientHeight+"px"
        let current=e.target
        //creating copy of the frame to be moved  
        node=e.target.cloneNode()
        node.addEventListener('mousedown',transit)
        node.addEventListener('mouseup',drop)
        window.addEventListener('mousemove',move)
            node.style.gridColumn="none"
            node.style.gridRow="none"
            node.style.position="absolute"
            node.style.top=e.target.offsetTop+"px"
            node.style.left=e.target.offsetLeft+"px"
            e.target.style.backgroundImage="none"
            document.body.appendChild(node)
            //dispatching mousedown event to the dragged copy of the frame
        node.dispatchEvent(event) 
        //moving the copy according to the mouse global coordinates
         function move(e){
            node.style.left=(e.pageX-20)+"px"
            node.style.top=(e.pageY-20)+"px"
            
        }
        //replacing or resetting the dragged copy with corresponding frame  
        function drop(e){
            window.removeEventListener('mousemove',move)
            for(frame of frames){
                if(frame.offsetLeft < e.pageX-20 && e.pageX-20 < frame.offsetLeft+frame.clientWidth && frame.offsetTop < e.pageY-20 && e.pageY-20 < frame.offsetTop+frame.clientHeight )
                {   aux=true
                    let style = e.target.currentStyle || window.getComputedStyle(e.target, false)
                    let bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
                    current.style.backgroundImage="url("+bi+")"
                     auxArea=current.style.gridArea
                     current.style.gridArea=frame.style.gridArea
                     frame.style.gridArea=auxArea
                    /* let style = e.target.currentStyle || window.getComputedStyle(e.target, false)
                    let bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
                    let stylei = frame.currentStyle || window.getComputedStyle(frame, false)
                    let bii = stylei.backgroundImage.slice(4, -1).replace(/"/g, "");
                    current.style.backgroundImage="url("+bii+")"
                    frame.style.backgroundImage="url("+bi+")"
                    */
                }
            }   
                if(aux)
                {
                    result=true;
                    //checking if puzzle is solved and displaying result
                for(let i=0;i<frames.length;i++)
                {
                   
                    
                    let row=frames[i].style.gridRow.match(/\d+/)[0]
                    let column=frames[i].style.gridColumn.match(/\d+/)[0]
                    if(row!=arrayCopy[i][0] || column!=arrayCopy[i][1])
                    {
                        result=false 
                        break
                    }
                }
                if(result==true)
                {
                    document.querySelector('.congrats').style.display="block"
                    document.querySelector('.congrats').style.opacity="1"
                    document.querySelector('.replay').style.opacity="1"
                    let container=document.querySelector('.container')
                    for(frame of frames){
                        frame.style.opacity="0"
                    }
                    setTimeout(()=>
                    {
                        while(container.firstChild)
                             {
                                container.firstChild.remove()
                            }
                    },2000)
                  container.style.backgroundImage="url('maisie.jpg')"
                }
                }
                else
                {
                    let style = e.target.currentStyle || window.getComputedStyle(e.target, false)
                    let bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
                    current.style.backgroundImage="url("+bi+")"
                }
               e.target.remove() 
         }
    }
    function transit() {;}
    
  
}