"use client"

interface PrintStatusProps {
  status: any
  onTryAgain: () => void
}

const PrintStatus = ({ status, onTryAgain }: PrintStatusProps) => {
  const isSuccess = status?.success || status?.Success

  return (
    <div className="print-status">
      <h2>{isSuccess ? "Print Successful!" : "Print Failed"}</h2>

      {isSuccess ? (
        <div className="success-message">
          <p>Your badge has been printed successfully.</p>
          <p>Please collect your badge from the printer.</p>
        </div>
      ) : (
        <div className="error-message">
          <p>There was an issue printing your badge.</p>
          <p>Error: {status?.message || status?.Message || "Unknown error"}</p>
          <button className="try-again-button" onClick={onTryAgain}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

export default PrintStatus
