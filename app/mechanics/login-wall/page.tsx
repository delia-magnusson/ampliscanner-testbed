"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginWallPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/mechanics/login-wall/dashboard");
  }

  return (
    <main className="page">
      <h1>Login Wall Mechanics Test</h1>
      <p>
        A fake login form gating two pages that are otherwise unreachable from the rest of the
        site. There is no real authentication, any input submits successfully.
      </p>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
    </main>
  );
}
