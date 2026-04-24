"""
Generation prompt templates.
"""

INSPIRATION_TEMPLATE = """\

--- Inspiration {index} ---
Score: {score}
Metrics:
{metrics_text}{reflection_block}
Code:
```{code_fence_tag}
{code}
```
"""

FAILURE_PATTERNS_TEMPLATE = """\

[FAILURE PATTERNS] (common errors to avoid)
{failure_lines}
"""

GENERATION_PROMPT_TEMPLATE = """\
Task: {instruction}

Generation instruction (must follow exactly):
1) Only the code between `{start_marker_line}` and `{end_marker_line}` is extracted.
2) The final program is reconstructed as EXACT_PREFIX + evolved_block + EXACT_SUFFIX.
3) Keep marker lines exactly as written.
4) Return one {language_name} code block that includes both EVOLVE-BLOCK markers.

EXACT_PREFIX (kept unchanged):
```{code_fence_tag}
{prefix}
```

EXACT_SUFFIX (kept unchanged):
```{code_fence_tag}
{suffix}
```
{available_packages_text}
=== REFERENCE SOLUTIONS ===
{policy_context_section}
[SAMPLED INSPIRATIONS] ({num_inspirations} solutions sampled for detailed reference)
Learn from these specific implementations - study their patterns and techniques.
{inspirations_text}
{failure_text}
=== GENERATION STRATEGY ===
- Prioritize NOVEL approaches not yet seen in the elite pool
- Only refine existing approaches if you identify clear improvement potential
- Combine insights from multiple solutions when beneficial
- Avoid the listed failure patterns

Generate an improved solution with higher score:
"""
