import {hello} from "./hello-world";

test("Prints hello world", ()=>{
    expect(hello()).toBe("Hello, World!")
})