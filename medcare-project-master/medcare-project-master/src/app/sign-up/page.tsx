"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import SearchDBTN from "../components/UI/SearchDBTN/SearchDBTN";
import InputField from "../components/UI/InputField/InputField";
import { Montserrat } from "next/font/google";
import { useState } from "react";
import { useAuth } from "@/app/context/authContext";

const MontserratFont = Montserrat({
  subsets: [],
  weight: "500",
});

const SignUpPage = () => {
  const { isAuthenticated, setAuthenticated } = useAuth(); // ✅ Access auth state
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Signup request failed");

      const { data: userData } = await response.json();

      setAuthenticated(true, userData);
      alert("Signup successful! Redirecting...");
      if (document.referrer) {
        router.back();
      } else {
        router.push("/");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/auth/google`;
  }
  return (
    <main className={styles.container}>
      <Image
        src="/sign-up-bg.png"
        alt="a doctor's desk"
        width={2493.21}
        height={911}
        style={{ objectFit: "cover" }}
        className={styles.bgImage}
      />
      <section className={`${styles.searchField} ${MontserratFont.className}`}>
        <span className={styles.head}>Sign Up</span>
        <div className={styles.searchDetails}>
          <span>
            Already a member? <Link href="/login">Login.</Link>
          </span>
        </div>

        {isAuthenticated ? (
          <div className={styles.alreadyLoggedIn}>
            <p>You are already logged in.</p>
            <SearchDBTN text="Go Back" bgColor="#1C4A2A"
              onClick={() => document.referrer ? router.back() : router.replace("/")} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.searchDetails2}>
            <InputField
              inputLabel="Name"
              vectorURL="/name-vector.png"
              placeholder="Enter your name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              inputLabel="Email"
              vectorURL="/email-vector.png"
              placeholder="Enter your email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              inputLabel="Password"
              vectorURL="/passwd-vector.png"
              placeholder="••••••••••"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <SearchDBTN text={loading ? "Submitting..." : "Submit"} bgColor="#1C4A2A" type="submit" />
            <SearchDBTN text="Reset" bgColor="#C6B09A" type="reset" onClick={() => setFormData({ name: "", email: "", password: "" })} />
            <SearchDBTN
              text="Login with Google"
              bgColor="#4285F4" // Google Blue
              type="button"
              onClick={handleGoogleLogin}
            />
          </form>
        )}

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </section>
    </main>
  );
};

export default SignUpPage;
