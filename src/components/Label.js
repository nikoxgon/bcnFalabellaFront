const Label = ({ className, children, ...props }) => (
    <label
        className={`${className} block font-medium text-sm text-neutral-200`}
        {...props}>
        {children}
    </label>
)

export default Label
