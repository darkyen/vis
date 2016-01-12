export default function getConstructorOf(obj){
    return Object.getPrototypeOf(obj).constructor;
}
