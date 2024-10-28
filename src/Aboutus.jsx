import React from "react";

const Avatar = ({ src, fallback }) => {
  return (
    <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mx-auto mb-4">
      {src ? (
        <img src={src} alt={fallback} className="w-full h-full object-cover" />
      ) : (
        <span className="text-4xl font-bold">{fallback}</span>
      )}
    </div>
  );
};

const Card = ({ children }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white w-1/2">
      {children}
    </div>
  );
};

const CardHeader = ({ title, description }) => {
  return (
    <div className="mb-4 text-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

const CardFooter = ({ children }) => {
  return <div className="mt-4">{children}</div>;
};

const Button = ({ children, href }) => {
  return (
    <a
      href={href}
      className="text-blue-500 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <div className="flex flex-row justify-center gap-8 mb-4">
        <Card>
          <CardHeader title="Sahil Mehta" description="Co-Founder" />
          <CardContent>
            <Avatar src="https://github.com/nutlope.png" fallback="RJ" />
            <p>College: Nirma University</p>
            <p>Year: 2023</p>
            <p>CGPA: 9.45</p>
            <p>Projects: 10+</p>
          </CardContent>
          <CardFooter>
            <Button href="https://www.linkedin.com/in/sahil-mehta-2a1baa2a6/">
              Connect on LinkedIn
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader title="Jainil PAtel" description="Co-Founder" />
          <CardContent>
            <Avatar src="https://github.com/nutlope.png" fallback="RM" />
            <p>College: Nirma University</p>
            <p>Year: 2023</p>
            <p>CGPA: 9.08</p>
            <p>Projects: 15+</p>
          </CardContent>
          <CardFooter>
            <Button href="https://www.linkedin.com/in/jainil-patel-952564278/">
              Connect on LinkedIn
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
