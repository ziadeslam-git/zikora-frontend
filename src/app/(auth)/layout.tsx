/**
 * Auth layout — wraps Login, Register, Forgot Password, etc.
 *
 * Intentionally minimal: no Header/Footer, centered content.
 * The design will be fleshed out in the Auth Pages task.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background-subtle px-4">
      {children}
    </div>
  );
}
