import * as React from 'react';
import { connect } from 'react-redux';

import BaseComponent from '@/pages/components/BaseComponent';

@(connect() as any)
export default class ArticleRelease extends BaseComponent {
    render() {
        return (
            <div className="c-page-article-release">
                article release
            </div>
        );
    }
}
