
export default function Card({ title, children }) {
    return (
      <div className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-800">
        {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
        <div>{children}</div>
      </div>
    );
  }
  