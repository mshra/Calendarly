"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Edit, Trash2, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./theme-toggle-button";
import LoginButton from "./LoginButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) redirect("/dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-lg hidden sm:inline">
            Calendarly
          </span>
        </Link>

        <button
          className="ml-auto sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <nav className="ml-auto hidden sm:flex gap-4 sm:gap-6 items-center">
          <Link
            className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <ModeToggle />
          <LoginButton />
        </nav>
      </header>

      {isMenuOpen && (
        <div className="sm:hidden bg-background border-b">
          <nav className="flex flex-col p-4 space-y-3">
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-primary"
              href="#"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-primary"
              href="#"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-primary"
              href="#"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simplify Your Schedule
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Effortlessly manage your events and meetings with our
                  intuitive calendar app. Stay organized and never miss an
                  important date again.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-6 bg-card rounded-xl shadow-sm">
                <Clock className="h-12 w-12 mb-2 text-primary" />
                <h3 className="text-xl font-bold">Create Events</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Easily add new events with just a few clicks. Set date, time,
                  and add details.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-card rounded-xl shadow-sm">
                <Edit className="h-12 w-12 mb-2 text-primary" />
                <h3 className="text-xl font-bold">Edit Anytime</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Update your events on the go. Change details or reschedule
                  with ease.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-card rounded-xl shadow-sm">
                <Trash2 className="h-12 w-12 mb-2 text-primary" />
                <h3 className="text-xl font-bold">Quick Delete</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Remove events you no longer need with a simple delete
                  function.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to streamline your schedule?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have simplified their lives with
                  our calendar app. Sign up now and take control of your time.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" className="w-full sm:w-auto">
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link
                    className="underline underline-offset-2 hover:text-primary"
                    href="#"
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 Calendarly Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-muted-foreground hover:text-primary"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-muted-foreground hover:text-primary"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
