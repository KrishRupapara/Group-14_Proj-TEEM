export default function Progressbar({ percent }: { percent: number }) {
  return (
    <div className="w-40 h-30">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        {/* Background Circle */}
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="60"
          cy="60"
          r="40"
          fill="transparent"
        ></circle>

        {/* Progress Circle */}
        <circle
          className="text-indigo-500  progress-ring__circle stroke-current"
          strokeWidth="10"
          strokeLinecap="round"
          cx="60"
          cy="60"
          r="40"
          fill="transparent"
          strokeDashoffset={`calc(400 - (250 * ${percent}) / 100)`}
        ></circle>

        {/* Center Text */}
        <text
          x="60"
          y="60"
          fontFamily="Verdana"
          fontSize="12"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {percent}%
        </text>
        {/* <div>
                            Percentage : <input type="number" name="num" placeholder="Number" id="myText" className="bg-gray border-2 border-black"/>
                            </div> */}
      </svg>
    </div>
  );
}
