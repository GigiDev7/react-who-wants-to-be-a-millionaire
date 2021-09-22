import React,{useState,useEffect} from 'react'


const Trivia = ({data,setStop,questionNumber,setQuestionNumber}) => {
    
    const [question,setQuestion] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [className,setClassname] = useState('answer')
    

    useEffect(() => {
        setQuestion(data[questionNumber - 1])
    },[data,questionNumber])

    const delay = (duration,callback) => {
        setTimeout(() => {
            callback()
        },duration)
    }

    const handleClick = (answer) => {
        setSelectedAnswer(answer)
        setClassname('answer active')
        delay(2000, () => setClassname(answer.correct ? 'answer correct' : 'answer wrong'))
        delay(5000, () => {
            if(answer.correct){
                setQuestionNumber(prev => prev + 1)
                setSelectedAnswer(null)
            }else{
                setStop(true)
            }
        })
    }
    
    return (
        <div className='trivia'>
            <div className='question'>{question?.question}</div>
            <div className='answers'>
                {
                    question?.answers.map(item => {
                        return (
                            <div onClick={() =>handleClick(item)} className={selectedAnswer === item ? className : 'answer'}>{item.text}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Trivia
