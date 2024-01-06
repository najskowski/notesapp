"use client"

import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { createUser } from "@/actions/create-user";
import { useToast } from "../../hooks/use-toast";
import { signIn } from "next-auth/react";

const SigninForm = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const handleSubmit = () => {
    signIn("credentials", { redirect: false, ...credentials })
  }
  return (
    <>
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input 
          id="email" 
          placeholder="E-mail"
          onChange={e => setCredentials({ ...credentials, email: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="password"
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
        />
      </div>
      <Button onClick={handleSubmit} className="w-full">Sign in</Button>
    </>
  );
};

const SignupForm = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  const { toast } = useToast()
  const handleSubmit = async () => {
    const result = await createUser(credentials)
    if(result.status === "success") {
      toast({
        title: "Success",
        description: result.message
      })
    } else if(result.status === "error") {
      toast({
        title: "Error",
        description: result.message
      })
    }
  }
  return (
    <>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          placeholder="Name"
          onChange={(e) => setCredentials({ ...credentials, name: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input 
          id="email"
          placeholder="E-mail"
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value})}
        />
      </div>
      <Button onClick={handleSubmit} className="w-full">Sign up</Button>
    </>
  );
};

export { SigninForm, SignupForm }