<form class="c-search-form" role="search" method="get" action="<?php echo esc_url(home_url('/')) ?>">
    <label class="c-search-form__label">
        <span class="screen-reader-text"><?php echo esc_html_x("Search for:", 'label', '_themename'); ?></span>
        <input class="c-search-form__field" type="search" name="s" placeholder="<?php echo esc_attr_x('Search &hellip;', 'placeholder', '_themename') ?>" value="<?php esc_attr(get_search_query()); ?>" />
    </label>
    <button class="c-search-form__button" type="submit">
        <span class="u-screen-reader-text"><?php echo esc_html_x('Seach', 'submit button', '_themename'); ?>
        </span>
        <i class="fas fa-search" aria-hidden="true"></i>
    </button>
</form>