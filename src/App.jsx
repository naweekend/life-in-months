import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function App() {
  const [birthdate, setBirthdate] = useState("");
  const [showGrid, setShowGrid] = useState(false);

  const totalYears = 70;
  const monthsInYear = 12;
  const totalMonths = totalYears * monthsInYear;

  // Age ranges in months
  const youthMonths = 33 * monthsInYear;
  const middleMonths = (55 - 33) * monthsInYear; // 22 years
  const oldMonths = (70 - 55) * monthsInYear; // 15 years

  const monthsLived = birthdate
    ? Math.min(
      totalMonths,
      Math.max(
        0,
        (new Date().getFullYear() - new Date(birthdate).getFullYear()) * 12 +
        (new Date().getMonth() - new Date(birthdate).getMonth())
      )
    )
    : 0;

  const percentageLived = (start, end) => {
    if (!birthdate) return 0;
    const livedInRange = Math.min(end, monthsLived) - start;
    return livedInRange > 0 ? Math.round((livedInRange / (end - start)) * 100) : 0;
  };

  const getMonthYear = (index) => {
    if (!birthdate) return "";
    const dateObj = new Date(birthdate);
    if (isNaN(dateObj)) return "";
    dateObj.setMonth(dateObj.getMonth() + index);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:py-20 py-10 p-6">
      <h1 className="text-3xl font-bold mb-4">Life in Months</h1>

      {/* Date picker */}
      {!showGrid && (
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="birthdate" className="font-medium opacity-85">
            Enter Date of Birth
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="input border bg-white text-black py-2 rounded-md w-48"
          />
        </div>
      )}

      {/* Show Me button */}
      {birthdate && !showGrid && (
        <Button className="mt-4" onClick={() => setShowGrid(true)}>
          Show Me →
        </Button>
      )}

      {/* Grid */}
      {showGrid && birthdate && (
        <>
          <div className="space-y-2 mb-6 text-center">
            <p>Each dot is a month of your life</p>
            <p className="text-sm opacity-85">
              You have spent {percentageLived(0, youthMonths)}% of your youth
            </p>
            <p className="text-sm opacity-85">
              You have spent {percentageLived(youthMonths, youthMonths + middleMonths)}% of middle age
            </p>
            <p className="text-sm opacity-85">
              You have spent {percentageLived(youthMonths + middleMonths, totalMonths)}% of old age
            </p>
          </div>

          <div className="grid grid-cols-30 md:gap-2 gap-1 justify-center max-w-full">
            {Array.from({ length: totalMonths }).map((_, i) => {
              let color = "bg-green-300"; // default future month

              if (i < monthsLived) {
                if (i < youthMonths) color = "bg-gray-500"; // youth
                else if (i < youthMonths + middleMonths) color = "bg-gray-500"; // middle
                else color = "bg-gray-500"; // old
              }

              return (
                <div className="tooltip" key={i} data-tip={getMonthYear(i)}>
                  <div
                    className={`md:w-3 w-2 md:h-3 h-2 rounded-full cursor-pointer ${color}`}
                  />
                </div>
              );
            })}
          </div>

          <Button
            className="mt-8 flex items-center gap-2"
            onClick={() => {
              setBirthdate("");
              setShowGrid(false);
            }}
          >
            <RotateCcw /> <span>Reset</span>
          </Button>

          <div className="space-y-2 py-5 text-center">
            <p>Average 70 year life</p>
            <p>Hover/Click over a dot to see month and year</p>
            <p style={{ fontFamily: "monospace" }}>Not a lot of months, huh?</p>
            <p style={{ fontFamily: "monospace" }}>Try putting in your parents' birthdate</p>
          </div>
        </>
      )}

      <div className="fixed text-sm opacity-80 bottom-2 left-2">
        <p>
          made by{" "}
          <a className="underline" target="_blank" href="https://github.com/naweekend">
            nabeel
          </a>
        </p>
      </div>
    </div>
  );
}
