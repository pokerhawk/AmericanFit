import SignInForm from "../../components/SignInForm";
import { FormWrapper, SignPageWrapper } from "../../styles/Global";
// import { Socket, io } from 'socket.io-client';

const SignInPage = () => {
    // const socket = io('http://localhost:3001', {
    //     transports: ['websocket'],
    // });

    // const [message, setMessage] = useState('ola');
    
    // const handleSubmitNewMessage = (data:string) =>{
    //     console.log(`sending data: ${data}`)
    //     socket.emit('test', { data: data })
    // }
    
    // useEffect(()=>{
    //     socket.on('test', ({ data }:any) => {//recieving message
    //         console.log(`recebendo mensagem: ${data}`)
    //         // setMessage(data)
    //     })
    
    //     const intervalId = setInterval(() => {
    //         socket.emit("test", { data: `oi ${Math.random()}` })
    //         // socket.close()
    //     }, 5000);
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [])

    return (
        <SignPageWrapper>
            <FormWrapper>
                <SignInForm />
            </FormWrapper>
        </SignPageWrapper>
    );
}

export default SignInPage;